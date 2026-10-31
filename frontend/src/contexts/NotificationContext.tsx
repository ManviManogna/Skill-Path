import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReminderNotification } from '../types';

interface NotificationContextType {
  notifications: ReminderNotification[];
  unreadCount: number;
  browserPermission: NotificationPermission | 'unsupported';
  requestBrowserPermission: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addReminder: (title: string, message: string, category?: ReminderNotification['category']) => void;
  clearAll: () => void;
}

const INITIAL_NOTIFICATIONS: ReminderNotification[] = [
  {
    id: 'notif-1',
    title: 'Daily Coding Streak',
    message: 'Keep your momentum going! Solve today\'s challenge: "Two Sum with Target Index Lookup".',
    time: '10 minutes ago',
    category: 'coding',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Upcoming Mock Interview',
    message: 'Technical interview practice scheduled for tomorrow at 5:00 PM (Topic: Core OS & DBMS).',
    time: '2 hours ago',
    category: 'interview',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Internship Application Deadline',
    message: 'Google STEP Internship applications close in 5 days. Ensure your resume ATS score is >= 75%.',
    time: '1 day ago',
    category: 'deadline',
    read: false
  },
  {
    id: 'notif-4',
    title: 'Study Timetable Session',
    message: 'Time for your 45-minute Data Structures session! Launch the Pomodoro timer.',
    time: 'Yesterday',
    category: 'study',
    read: true
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<ReminderNotification[]>(() => {
    const saved = localStorage.getItem('skillpath_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [browserPermission, setBrowserPermission] = useState<NotificationPermission | 'unsupported'>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setBrowserPermission(Notification.permission);
    } else {
      setBrowserPermission('unsupported');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skillpath_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }
    const result = await Notification.requestPermission();
    setBrowserPermission(result);
    if (result === 'granted') {
      new Notification('SkillPath AI Reminders Activated', {
        body: 'You will now receive smart reminders for study sessions, coding challenges, and placement deadlines.',
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addReminder = (title: string, message: string, category: ReminderNotification['category'] = 'study') => {
    const newNotif: ReminderNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      category,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Send browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        browserPermission,
        requestBrowserPermission,
        markAsRead,
        markAllAsRead,
        addReminder,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

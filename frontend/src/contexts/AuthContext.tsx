import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: StudentProfile;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  updateProfile: (updates: Partial<StudentProfile>) => Promise<void>;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, initialProfile: Partial<StudentProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_PROFILE: StudentProfile = {
  id: 'student-demo-1',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@example.edu',
  collegeName: 'National Institute of Technology',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  currentYear: 3,
  graduationYear: 2026,
  currentSkills: ['Python', 'C++', 'Data Structures', 'Git', 'SQL', 'React.js'],
  preferredLanguage: 'Python',
  careerInterest: 'Software Developer',
  currentLearningLevel: 'Intermediate',
  dailyStudyHours: 3.5,
  bio: 'Passionate 3rd-year CS undergrad preparing for tier-1 campus placements and open-source contributions.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-08-15T09:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('skillpath_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PROFILE;
  });

  const [user, setUser] = useState<{ id: string; email: string } | null>(() => {
    const savedUser = localStorage.getItem('skillpath_student_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    return { id: profile.id, email: profile.email };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('skillpath_is_authenticated') === 'true' || true; // Default true so user can immediately experience dashboard
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('skillpath_is_onboarded') !== 'false';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync profile changes to localStorage
  useEffect(() => {
    localStorage.setItem('skillpath_student_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skillpath_student_user', JSON.stringify(user));
      localStorage.setItem('skillpath_is_authenticated', 'true');
    } else {
      localStorage.removeItem('skillpath_student_user');
      localStorage.setItem('skillpath_is_authenticated', 'false');
    }
  }, [user]);

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('profiles')
          .update({
            full_name: updated.fullName,
            college_name: updated.collegeName,
            degree: updated.degree,
            branch: updated.branch,
            current_year: updated.currentYear,
            graduation_year: updated.graduationYear,
            current_skills: updated.currentSkills,
            preferred_language: updated.preferredLanguage,
            career_interest: updated.careerInterest,
            current_learning_level: updated.currentLearningLevel,
            daily_study_hours: updated.dailyStudyHours,
            bio: updated.bio
          })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Supabase profile sync error:', err);
      }
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });
          setIsAuthenticated(true);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo login
      setUser({ id: 'student-demo-1', email });
      setProfile(prev => ({ ...prev, email }));
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed' };
    }
  };

  const signup = async (
    email: string,
    pass: string,
    initialProfile: Partial<StudentProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: { full_name: initialProfile.fullName || 'Student' }
          }
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const newId = data.user.id;
          setUser({ id: newId, email });
          const newProfile: StudentProfile = {
            ...DEFAULT_PROFILE,
            ...initialProfile,
            id: newId,
            email
          };
          setProfile(newProfile);
          setIsAuthenticated(true);
          setIsOnboarded(true);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo signup
      const newId = `student-${Date.now()}`;
      setUser({ id: newId, email });
      const newProfile: StudentProfile = {
        ...DEFAULT_PROFILE,
        ...initialProfile,
        id: newId,
        email
      };
      setProfile(newProfile);
      setIsAuthenticated(true);
      setIsOnboarded(true);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: `Password reset instructions sent to ${email}` };
    }
    return {
      success: true,
      message: `Demo Mode: Password reset link generated for ${email}. (In live mode, Supabase sends a secure reset email).`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated,
        isOnboarded,
        isLoading,
        isSupabaseConnected: isSupabaseConfigured,
        updateProfile,
        login,
        signup,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kdsacywhjmzkogqtnxwt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc2FjeXdoam16a29ncXRueHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMDM2NjksImV4cCI6MjExMDY3OTY2OX0.fguTFRt5yXzwQgo6LJPqp0u8C8dxS-1bPiHgD_IYZko';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign In with Email & Password
 */
export async function signInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Sign Up with Email & Password
 */
export async function signUpUser(email, password, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Sign In with Google OAuth
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Sign Out Current User
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Save a complete tour / cab / package booking reservation
 */
export async function createBooking(bookingPayload) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase createBooking error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error in createBooking:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Save an inquiry from Hero widget, custom planner, or quick consultation
 */
export async function createInquiry(inquiryPayload) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase createInquiry error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error in createInquiry:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Save newsletter subscriber email
 */
export async function subscribeNewsletter(email) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      // 23505 is unique violation in Postgres
      if (error.code === '23505') {
        return { success: true, message: 'You are already subscribed!' };
      }
      console.error('Supabase subscribeNewsletter error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error in subscribeNewsletter:', err);
    return { success: false, error: err.message };
  }
}

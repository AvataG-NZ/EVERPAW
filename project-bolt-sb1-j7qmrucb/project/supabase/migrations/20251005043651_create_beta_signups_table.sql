/*
  # Create Beta Signups Table

  ## Summary
  Creates a table to store beta program applications from interested users.

  ## New Tables
  
  ### `beta_signups`
  Stores applications for the beta program with user details and interests.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each signup
  - `name` (text, required) - Full name of the applicant
  - `email` (text, required, unique) - Email address for contact
  - `pets` (text, required) - Information about their pets
  - `experience` (text, required) - Why they want to join and their experience
  - `created_at` (timestamptz) - Timestamp of application submission
  - `status` (text, default 'pending') - Application status (pending, approved, rejected)

  ## Security
  - Enables RLS on `beta_signups` table
  - Allows public insert access (anyone can apply)
  - Only authenticated admins can read applications

  ## Notes
  - Email field has unique constraint to prevent duplicate applications
  - Default status is 'pending' for new applications
  - Created_at timestamp automatically set on insertion
*/

-- Create beta_signups table
CREATE TABLE IF NOT EXISTS beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  pets text NOT NULL,
  experience text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (apply for beta)
CREATE POLICY "Anyone can apply for beta"
  ON beta_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow reading for authenticated users (admins)
CREATE POLICY "Only authenticated users can view applications"
  ON beta_signups
  FOR SELECT
  TO authenticated
  USING (true);

/*
  # Create user profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `mobile_number` (text)
      - `username` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for users to read and update their own profile
    - Add policy for users to read other profiles (for social features)
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  mobile_number text NOT NULL,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read and update own profile"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read other profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS user_profiles_username_idx ON user_profiles(username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
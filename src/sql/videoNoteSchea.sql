-- 1. Create the video_notes relational table inside the public schema
CREATE TABLE IF NOT EXISTS public.video_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    video_id TEXT NOT NULL,
    timestamp_seconds INTEGER DEFAULT 0,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create high-performance query indexing on video_id and user_id
CREATE INDEX IF NOT EXISTS idx_video_notes_video_user ON public.video_notes (video_id, user_id);

-- 3. Enable enterprise Row Level Security (RLS)
ALTER TABLE public.video_notes ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Security Policies for Authenticated Owners
CREATE POLICY "Users can view their own private study notes" 
    ON public.video_notes 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert study notes linked to their account" 
    ON public.video_notes 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit their own existing study notes" 
    ON public.video_notes 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own personal study notes" 
    ON public.video_notes 
    FOR DELETE 
    USING (auth.uid() = user_id);
-- ==========================================
-- MediaAdvertising Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- 1. PROJECTS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    optional_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);

-- ------------------------------------------
-- 2. LOCATIONS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    location_text VARCHAR(255) NOT NULL,
    zone VARCHAR(150) DEFAULT 'Sheikh Zayed Road Boulevard Zone',
    specs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ------------------------------------------
-- 3. QUOTATION_REQUESTS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.quotation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    service_type VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for ordering by creation date
CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON public.quotation_requests(created_at DESC);

-- ------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access to Projects and Locations
CREATE POLICY "Allow public read access for projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for locations" ON public.locations
    FOR SELECT USING (true);

-- Allow public insert access for Quotation Requests
CREATE POLICY "Allow public insert for quotation_requests" ON public.quotation_requests
    FOR INSERT WITH CHECK (true);

-- Allow full access for anon/authenticated (Admin preview)
CREATE POLICY "Allow full access to projects for anon/auth" ON public.projects
    FOR ALL USING (true);

CREATE POLICY "Allow full access to locations for anon/auth" ON public.locations
    FOR ALL USING (true);

CREATE POLICY "Allow full access to quotation_requests for anon/auth" ON public.quotation_requests
    FOR ALL USING (true);

-- ------------------------------------------
-- SEED DATA (INITIAL DEMO DATA)
-- ------------------------------------------

INSERT INTO public.locations (name, description, image_url, location_text, zone, specs) VALUES
(
  'Shangri-La Horizon Mega Screen',
  'Prime double-sided high-definition digital billboard positioned directly beside Shangri-La Hotel on Sheikh Zayed Road. Captures elite executive and tourist traffic heading towards Downtown Dubai.',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'Beside Shangri-La Hotel, Sheikh Zayed Road',
  'Sheikh Zayed Road Boulevard Zone',
  'Dimensions: 18m x 6m | Resolution: 4K Ultra HD LED | Daily Impressions: 280,000+'
),
(
  'Boulevard Grand Digital Arch',
  'State-of-the-art curved LED arch spanning the main arterial entry of Sheikh Zayed Road Boulevard Zone. Exceptional dwell time and unobstructed night visibility.',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'Boulevard Zone Entry Arch, Sheikh Zayed Road',
  'Sheikh Zayed Road Boulevard Zone',
  'Dimensions: 24m x 8m | Refresh Rate: 3840Hz | Daily Impressions: 320,000+'
),
(
  'Financial Center Vista Billboard',
  'Super-wide high contrast LED display adjacent to DIFC and Boulevard crossing. Target corporate executives, high-net-worth investors, and luxury shoppers.',
  'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
  'Boulevard North Junction, Sheikh Zayed Road',
  'Sheikh Zayed Road Boulevard Zone',
  'Dimensions: 15m x 5m | HDR Dynamic Brightness | Daily Impressions: 240,000+'
),
(
  'Downtown Gate Dynamic Screen',
  'Vertical high-impact DOOH screen positioned at the gateway connecting Sheikh Zayed Road to the Boulevard Promenade. Ideal for luxury automotive, watch, and real estate launches.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'Boulevard South Plaza, Sheikh Zayed Road',
  'Sheikh Zayed Road Boulevard Zone',
  'Dimensions: 12m x 16m | Interactive Audio Sync | Daily Impressions: 210,000+'
);

INSERT INTO public.projects (title, description, image_url, location, category, optional_details) VALUES
(
  'Apex Luxury Automotive Launch',
  'Multi-screen synchronous DOOH campaign across Sheikh Zayed Road Boulevard screens for a high-end luxury electric vehicle release.',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  'Beside Shangri-La Hotel, Sheikh Zayed Road',
  'DOOH Campaigns',
  'Achieved 1.4M total verified impressions over a 7-day launch burst with 3D anamorphic video execution.'
),
(
  'Crown Jewels Global Heritage Exhibit',
  'Curated LED illumination and high-visibility branding takeover along Sheikh Zayed Road Boulevard Zone.',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  'Boulevard Grand Digital Arch, Sheikh Zayed Road',
  'Brand Activations',
  'Interactive real-time QR scan integration yielding 45,000 direct mobile engagements.'
),
(
  'Horizon Towers Sky Residence Debut',
  'Strategic real estate campaign targeting high-net-worth commuters on Sheikh Zayed Road.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'Financial Center Vista Billboard',
  'Digital Screens',
  '100% prime-time slot coverage during peak morning and evening traffic flow.'
),
(
  'Velocita Smart Watch 3D Takeover',
  'Anamorphic 3D optical illusion display stopping traffic along the Sheikh Zayed Road Boulevard Corridor.',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  'Downtown Gate Dynamic Screen',
  '3D Anamorphic',
  'Viral social media reach with over 3.2M organic impressions across LinkedIn and Instagram.'
);

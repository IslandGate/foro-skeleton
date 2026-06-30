"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize your Supabase client
// Replace these with your actual environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface CompetitionCardData {
  title: string;
  image: string;
  tags: string[];
  subjects: string[];
  registerDeadline: string;
  location: string;
  prizeType: string;
  groupSize: string;
  information: string;
  studentsCount: number;
  competitionWebsite: string;
}

const mockCompetitions: CompetitionCardData[] = [
  {
    title: "Global Robotics Championship 2026",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800",
    tags: ["Popular", "Tech"],
    subjects: ["Chemistry", "Physics"],
    registerDeadline: "2026-05-15",
    location: "San Francisco, CA (Hybrid)",
    prizeType: "$50,000 Cash",
    groupSize: "Team (3-5 members)",
    information: "Design and program autonomous robots for complex navigation challenges.",
    studentsCount: 1500,
    competitionWebsite: "https://google.com",
  },
  {
    title: "International Math Olympiad Qualifiers",
    image: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=800",
    tags: ["Elite", "Math"],
    subjects: ["Maths"],
    registerDeadline: "2026-03-01",
    location: "Online",
    prizeType: "Certificate",
    groupSize: "Individual",
    information: "The ultimate proving ground for the world's best young mathematicians.",
    studentsCount: 3200,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Eco-Innovation Design Challenge",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800",
    tags: ["New", "Science"],
    subjects: ["Environmental Science", "Chemistry"],
    registerDeadline: "2026-04-20",
    location: "London, UK",
    prizeType: "Scholarship",
    groupSize: "Duo (2 members)",
    information: "Pitch sustainable product ideas to a panel of venture capitalists.",
    studentsCount: 420,
    competitionWebsite: "https://google.com",
  },
  {
    title: "AI Ethics & Policy Symposium",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    tags: ["Humanities", "Tech"],
    subjects: ["Computer Science", "Economics"],
    registerDeadline: "2026-06-10",
    location: "Washington D.C.",
    prizeType: "Scholarship",
    groupSize: "Individual",
    information: "Debate the future of artificial intelligence and its impact on global policy.",
    studentsCount: 850,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Bio-Medical Breakthrough Hack",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800",
    tags: ["Medical", "Research"],
    subjects: ["Biology", "Chemistry"],
    registerDeadline: "2026-07-05",
    location: "Boston, MA",
    prizeType: "$10,000 Cash",
    groupSize: "Team (2-4 members)",
    information: "Solve real-world healthcare problems using data science and lab research.",
    studentsCount: 600,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Global Markets Trading Challenge",
    image: "https://images.unsplash.com/photo-1611974714139-edddce9979ed?q=80&w=800",
    tags: ["Finance", "High-Stakes"],
    subjects: ["Maths", "Economics"],
    registerDeadline: "2026-08-12",
    location: "Online",
    prizeType: "$50,000 Cash",
    groupSize: "Team (1-8 members)",
    information: "Manage a virtual portfolio and compete for the highest risk-adjusted returns.",
    studentsCount: 5000,
    competitionWebsite: "https://google.com",
  },
];

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message: string } | null>(null);

  const handleUpload = async () => {
    setLoading(true);
    setStatus(null);

    // Map frontend camelCase naming convention to standard SQL snake_case column names
    const dataToUpload = mockCompetitions.map((comp) => ({
      title: comp.title,
      image: comp.image,
      tags: comp.tags,
      subjects: comp.subjects,
      register_deadline: comp.registerDeadline,
      location: comp.location,
      prize_type: comp.prizeType,
      group_size: comp.groupSize,
      information: comp.information,
      students_count: comp.studentsCount,
      competition_website: comp.competitionWebsite,
    }));

    try {
      const { error } = await supabase
        .from('competitions')
        .insert(dataToUpload);

      if (error) throw error;

      setStatus({ success: true, message: `Successfully uploaded ${mockCompetitions.length} items to Supabase!` });
    } catch (err: any) {
      console.error(err);
      setStatus({ success: false, message: err.message || 'An error occurred during upload.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Supabase Data Importer</h2>
      <p>Click below to push your mock competitions dataset to the database.</p>
      
      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#3ecf8e', // Supabase green
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Uploading...' : 'Upload Data Now'}
      </button>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          borderRadius: '4px',
          backgroundColor: status.success ? '#e6f7ed' : '#fce8e6',
          color: status.success ? '#1e7e34' : '#c53030',
          border: `1px solid ${status.success ? '#a3cfbb' : '#f5c2c2'}`
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
}
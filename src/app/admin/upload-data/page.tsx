"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize your Supabase client
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function CreateCompetitionForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    message: string;
  } | null>(null);

  // 1. Full state matching your interface requirements
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    tags: "", // We will process this into an array on submit
    subjects: "", // We will process this into an array on submit
    registerDeadline: "",
    location: "",
    prizeType: "",
    groupSize: "",
    information: "",
    studentsCount: 0,
    competitionWebsite: "",
  });

  // 2. Handle input changes dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "studentsCount" ? Number(value) : value,
    }));
  };

  // 3. Submit directly to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Convert comma-separated strings back into arrays and clean up whitespace
    const processedTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const processedSubjects = formData.subjects
      .split(",")
      .map((sub) => sub.trim())
      .filter(Boolean);

    // Map to standard SQL snake_case column names
    const dataToUpload = {
      title: formData.title,
      image: formData.image,
      tags: processedTags,
      subjects: processedSubjects,
      register_deadline: formData.registerDeadline,
      location: formData.location,
      prize_type: formData.prizeType,
      group_size: formData.groupSize,
      information: formData.information,
      students_count: formData.studentsCount,
      competition_website: formData.competitionWebsite,
    };

    try {
      const { error } = await supabase
        .from("competitions")
        .insert([dataToUpload]);

      if (error) throw error;

      setStatus({ success: true, message: "Competition added successfully!" });

      // Reset form on success
      setFormData({
        title: "",
        image: "",
        tags: "",
        subjects: "",
        registerDeadline: "",
        location: "",
        prizeType: "",
        groupSize: "",
        information: "",
        studentsCount: 0,
        competitionWebsite: "",
      });
    } catch (err: any) {
      console.error(err);
      setStatus({
        success: false,
        message: err.message || "Failed to add competition.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Basic styling object to keep the JSX clean
  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Add New Competition</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Enter the details below to push a new card directly to the database.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label>
            <strong>Title:</strong>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="e.g. Global Robotics Championship"
          />
        </div>

        <div>
          <label>
            <strong>Image URL:</strong>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div>
          <label>
            <strong>Tags (comma-separated):</strong>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Popular, Tech, New"
          />
        </div>

        <div>
          <label>
            <strong>Subjects (comma-separated):</strong>
          </label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Chemistry, Physics"
          />
        </div>

        <div>
          <label>
            <strong>Registration Deadline:</strong>
          </label>
          <input
            type="date"
            name="registerDeadline"
            value={formData.registerDeadline}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>
            <strong>Location:</strong>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="San Francisco, CA (Hybrid)"
          />
        </div>

        <div>
          <label>
            <strong>Prize Type:</strong>
          </label>
          <input
            type="text"
            name="prizeType"
            value={formData.prizeType}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="$50,000 Cash or Certificate"
          />
        </div>

        <div>
          <label>
            <strong>Group Size:</strong>
          </label>
          <input
            type="text"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Individual or Team (3-5 members)"
          />
        </div>

        <div>
          <label>
            <strong>Expected Students Count:</strong>
          </label>
          <input
            type="number"
            name="studentsCount"
            value={formData.studentsCount}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
        </div>

        <div>
          <label>
            <strong>Competition Website:</strong>
          </label>
          <input
            type="url"
            name="competitionWebsite"
            value={formData.competitionWebsite}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="https://..."
          />
        </div>

        <div>
          <label>
            <strong>Information / Description:</strong>
          </label>
          <textarea
            name="information"
            value={formData.information}
            onChange={handleChange}
            required
            rows={4}
            style={inputStyle}
            placeholder="Describe the competition..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 20px",
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading ? "#ccc" : "#3ecf8e",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving to Database..." : "Add Competition"}
        </button>
      </form>

      {status && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "4px",
            fontWeight: "bold",
            backgroundColor: status.success ? "#e6f7ed" : "#fce8e6",
            color: status.success ? "#1e7e34" : "#c53030",
            border: `1px solid ${status.success ? "#a3cfbb" : "#f5c2c2"}`,
          }}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}

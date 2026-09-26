import { API_URL } from "@/config";

export type Service = {
  id: string;
  index: string;
  slug: string;
  title: string;
  line: string;
  summary: string;
  description: string;
  deliverables: string[];
  image: string;
  image_alt: string;
  category: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  details: string[];
  image: string;
  image_alt: string;
  is_placeholder: boolean;
};

export type Pillar = {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: string;
};

export type ProcessStage = {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverable: string;
};

export type ConsultationPayload = {
  full_name: string;
  phone: string;
  email: string;
  project_type: string;
  project_location: string;
  message: string;
};

export type ConsultationResult = {
  id: string;
  reference: string;
  status: string;
  created_at: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export const getServices = () => request<Service[]>("/api/services");

export const getProjects = (category?: string) => {
  const query =
    category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
  return request<Project[]>(`/api/projects${query}`);
};

export const getPillars = () => request<Pillar[]>("/api/pillars");

export const getProcess = () => request<ProcessStage[]>("/api/process");

export const createConsultation = (payload: ConsultationPayload) =>
  request<ConsultationResult>("/api/consultations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

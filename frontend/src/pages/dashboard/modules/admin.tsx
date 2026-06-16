import { useEffect, useMemo, useState } from "react";
import { api } from "@/shared/api/api";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Plus,
  Save,
  Trash2,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface CourseCompletions {
  title: string;
  count: number;
}

interface AnalyticsData {
  totalUsers: number;
  totalCourses: number;
  totalCompletions: number;
  completionsByCourse: CourseCompletions[];
}

type ResourceKey =
  | "courses"
  | "topics"
  | "revisions"
  | "interviews"
  | "git-commands"
  | "pdfs"
  | "videos";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select";

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
}

interface ResourceItem {
  _id: string;
  [key: string]: unknown;
}

interface ResourceConfig {
  key: ResourceKey;
  title: string;
  listEndpoint: string;
  adminEndpoint: string;
  fields: FieldConfig[];
  summaryFields: string[];
}

type FormState = Record<string, string | boolean>;
type ResourceData = Record<ResourceKey, ResourceItem[]>;

const emptyData: ResourceData = {
  courses: [],
  topics: [],
  revisions: [],
  interviews: [],
  "git-commands": [],
  pdfs: [],
  videos: [],
};

const getString = (value: unknown) => {
  return typeof value === "string" ? value : "";
};

const getNumberString = (value: unknown) => {
  return typeof value === "number" ? String(value) : "";
};

const getCourseId = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "_id" in value) {
    return getString((value as ResourceItem)._id);
  }
  return "";
};

const getCourseTitle = (value: unknown) => {
  if (value && typeof value === "object" && "title" in value) {
    return getString((value as { title?: unknown }).title);
  }
  return "";
};

export default function AdminModule() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [resources, setResources] = useState<ResourceData>(emptyData);
  const [activeResource, setActiveResource] = useState<ResourceKey>("courses");
  const [editingItem, setEditingItem] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState<FormState>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const courseOptions = resources.courses.map((course) => ({
    label: getString(course.title),
    value: course._id,
  }));

  const resourceConfigs: ResourceConfig[] = useMemo(
    () => [
      {
        key: "courses",
        title: "Courses",
        listEndpoint: "/courses/admin/all",
        adminEndpoint: "/courses",
        summaryFields: ["slug", "level", "language"],
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "thumbnail", label: "Thumbnail URL", type: "text" },
          {
            name: "language",
            label: "Language",
            type: "select",
            options: [
              { label: "English", value: "english" },
              { label: "Hindi", value: "hindi" },
              { label: "Gujarati", value: "gujarati" },
            ],
          },
          {
            name: "level",
            label: "Level",
            type: "select",
            options: [
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
            ],
          },
          { name: "duration", label: "Duration Minutes", type: "number" },
          { name: "isPublished", label: "Published", type: "checkbox" },
        ],
      },
      {
        key: "topics",
        title: "Course Topics",
        listEndpoint: "/course-topics/admin/all",
        adminEndpoint: "/course-topics",
        summaryFields: ["course", "slug", "order"],
        fields: [
          {
            name: "course",
            label: "Course",
            type: "select",
            options: courseOptions,
          },
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "text" },
          { name: "shortDescription", label: "Short Description", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "videoUrl", label: "Embed Video URL", type: "text" },
          { name: "order", label: "Order", type: "number" },
          { name: "estimatedMinutes", label: "Estimated Minutes", type: "number" },
          { name: "isPublished", label: "Published", type: "checkbox" },
        ],
      },
      {
        key: "revisions",
        title: "Revision Cards",
        listEndpoint: "/modules/revisions",
        adminEndpoint: "/modules/admin/revisions",
        summaryFields: ["category"],
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "keyPoints", label: "Key Points, one per line", type: "textarea" },
        ],
      },
      {
        key: "interviews",
        title: "Interview Questions",
        listEndpoint: "/modules/interviews",
        adminEndpoint: "/modules/admin/interviews",
        summaryFields: ["category", "difficulty"],
        fields: [
          { name: "question", label: "Question", type: "textarea" },
          { name: "answer", label: "Answer", type: "textarea" },
          {
            name: "difficulty",
            label: "Difficulty",
            type: "select",
            options: [
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ],
          },
          { name: "category", label: "Category", type: "text" },
        ],
      },
      {
        key: "git-commands",
        title: "Git Commands",
        listEndpoint: "/modules/git-commands",
        adminEndpoint: "/modules/admin/git-commands",
        summaryFields: ["category", "command"],
        fields: [
          { name: "command", label: "Command", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "category", label: "Category", type: "text" },
          { name: "example", label: "Example", type: "text" },
        ],
      },
      {
        key: "pdfs",
        title: "PDF Resources",
        listEndpoint: "/modules/pdfs",
        adminEndpoint: "/modules/admin/pdfs",
        summaryFields: ["category", "pdfUrl"],
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "pdfUrl", label: "PDF URL", type: "text" },
          { name: "category", label: "Category", type: "text" },
        ],
      },
      {
        key: "videos",
        title: "YouTube Videos",
        listEndpoint: "/modules/videos",
        adminEndpoint: "/modules/admin/videos",
        summaryFields: ["playlistName", "videoId"],
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "videoId", label: "YouTube Video ID", type: "text" },
          { name: "playlistName", label: "Playlist Name", type: "text" },
          { name: "order", label: "Order", type: "number" },
        ],
      },
    ],
    [courseOptions]
  );

  const activeConfig =
    resourceConfigs.find((config) => config.key === activeResource) ||
    resourceConfigs[0];

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsResponse, ...resourceResponses] = await Promise.all([
        api.get("/modules/analytics"),
        ...resourceConfigs.map((config) => api.get(config.listEndpoint)),
      ]);

      const nextData = { ...emptyData };
      resourceConfigs.forEach((config, index) => {
        nextData[config.key] = resourceResponses[index].data.data || [];
      });

      setAnalytics(analyticsResponse.data.data);
      setResources(nextData);
    } catch {
      toast.error("Failed to load admin data or access unauthorized.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const buildEmptyForm = (config: ResourceConfig) => {
    return config.fields.reduce<FormState>((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {});
  };

  const buildEditForm = (config: ResourceConfig, item: ResourceItem) => {
    return config.fields.reduce<FormState>((acc, field) => {
      const value = item[field.name];

      if (field.type === "checkbox") {
        acc[field.name] = Boolean(value);
      } else if (field.type === "number") {
        acc[field.name] = getNumberString(value);
      } else if (field.name === "keyPoints" && Array.isArray(value)) {
        acc[field.name] = value.join("\n");
      } else if (field.name === "course") {
        acc[field.name] = getCourseId(value);
      } else {
        acc[field.name] = getString(value);
      }

      return acc;
    }, {});
  };

  const startCreate = () => {
    setEditingItem(null);
    setForm(buildEmptyForm(activeConfig));
  };

  const startEdit = (item: ResourceItem) => {
    setEditingItem(item);
    setForm(buildEditForm(activeConfig, item));
  };

  const closeForm = () => {
    setEditingItem(null);
    setForm({});
  };

  const updateFormValue = (name: string, value: string | boolean) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const toPayload = () => {
    return activeConfig.fields.reduce<Record<string, unknown>>((payload, field) => {
      const value = form[field.name];

      if (field.type === "number") {
        payload[field.name] = value === "" ? undefined : Number(value);
      } else if (field.type === "checkbox") {
        payload[field.name] = Boolean(value);
      } else if (field.name === "keyPoints" && typeof value === "string") {
        payload[field.name] = value
          .split("\n")
          .map((point) => point.trim())
          .filter(Boolean);
      } else {
        payload[field.name] = value;
      }

      return payload;
    }, {});
  };

  const saveResource = async () => {
    setSaving(true);
    try {
      const payload = toPayload();

      if (editingItem) {
        await api.put(`${activeConfig.adminEndpoint}/${editingItem._id}`, payload);
        toast.success(`${activeConfig.title} item updated.`);
      } else {
        await api.post(activeConfig.adminEndpoint, payload);
        toast.success(`${activeConfig.title} item created.`);
      }

      closeForm();
      await loadAdminData();
    } catch {
      toast.error("Unable to save content. Please check required fields.");
    } finally {
      setSaving(false);
    }
  };

  const deleteResource = async (item: ResourceItem) => {
    const label =
      getString(item.title) ||
      getString(item.question) ||
      getString(item.command) ||
      "this item";

    if (!window.confirm(`Delete ${label}?`)) {
      return;
    }

    try {
      await api.delete(`${activeConfig.adminEndpoint}/${item._id}`);
      toast.success(`${activeConfig.title} item deleted.`);
      await loadAdminData();
    } catch {
      toast.error("Unable to delete content.");
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = form[field.name];
    const baseClass =
      "w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500";

    if (field.type === "textarea") {
      return (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateFormValue(field.name, event.target.value)}
          className={`${baseClass} min-h-24 resize-y`}
        />
      );
    }

    if (field.type === "checkbox") {
      return (
        <button
          type="button"
          onClick={() => updateFormValue(field.name, !value)}
          className={`inline-flex h-9 items-center rounded-lg border px-3 text-xs font-semibold transition ${
            value
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-zinc-800 bg-zinc-950/60 text-zinc-400"
          }`}
        >
          {value ? "Published" : "Draft"}
        </button>
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateFormValue(field.name, event.target.value)}
          className={baseClass}
        >
          <option value="">Select</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => updateFormValue(field.name, event.target.value)}
        className={baseClass}
      />
    );
  };

  const renderSummaryValue = (item: ResourceItem, fieldName: string) => {
    const value = item[fieldName];

    if (fieldName === "course") {
      return getCourseTitle(value);
    }

    if (typeof value === "boolean") {
      return value ? "Published" : "Draft";
    }

    if (typeof value === "number") {
      return String(value);
    }

    return getString(value);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-16 text-center text-zinc-500">
        <AlertTriangle size={40} className="mb-3 text-rose-500" />
        <h3 className="font-semibold text-zinc-400">Access Restricted</h3>
        <p className="mt-1 text-sm text-zinc-600">
          Only users with admin credentials can manage platform content.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-8">
      <div>
        <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-extrabold text-transparent">
          Admin Workspace
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Manage analytics, learning paths, and quick-reference resources.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#18181b]/35 p-5">
          <div>
            <span className="text-xs font-semibold uppercase text-zinc-500">
              Users
            </span>
            <h3 className="mt-1 text-3xl font-black text-white">
              {analytics.totalUsers}
            </h3>
          </div>
          <Users className="text-indigo-400" size={24} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#18181b]/35 p-5">
          <div>
            <span className="text-xs font-semibold uppercase text-zinc-500">
              Courses
            </span>
            <h3 className="mt-1 text-3xl font-black text-white">
              {analytics.totalCourses}
            </h3>
          </div>
          <GraduationCap className="text-violet-400" size={24} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#18181b]/35 p-5">
          <div>
            <span className="text-xs font-semibold uppercase text-zinc-500">
              Completions
            </span>
            <h3 className="mt-1 text-3xl font-black text-white">
              {analytics.totalCompletions}
            </h3>
          </div>
          <CheckCircle2 className="text-emerald-400" size={24} />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-[#18181b]/35 p-5">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <BarChart3 size={16} className="text-indigo-400" />
          Course Completion Distribution
        </h2>

        <div className="space-y-3">
          {analytics.completionsByCourse.map((course) => (
            <div key={course.title} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-300">{course.title}</span>
                <span className="text-indigo-300">{course.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{
                    width: `${Math.min(
                      (course.count / Math.max(analytics.totalCompletions, 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}

          {analytics.completionsByCourse.length === 0 && (
            <p className="py-4 text-center text-sm text-zinc-600">
              No completions recorded yet.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-wrap gap-2 border-b border-zinc-800/70 pb-3">
          {resourceConfigs.map((config) => (
            <button
              key={config.key}
              onClick={() => {
                setActiveResource(config.key);
                closeForm();
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                activeResource === config.key
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
              }`}
            >
              {config.title}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{activeConfig.title}</h2>
            <p className="text-xs text-zinc-500">
              {resources[activeResource].length} records
            </p>
          </div>

          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {Object.keys(form).length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-[#18181b]/55 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? "Edit Content" : "Create Content"}
              </h3>
              <button
                onClick={closeForm}
                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {activeConfig.fields.map((field) => (
                <label
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <span className="mb-1.5 block text-xs font-semibold uppercase text-zinc-500">
                    {field.label}
                  </span>
                  {renderField(field)}
                </label>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={saveResource}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-zinc-800">
          {resources[activeResource].map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 border-b border-zinc-800 bg-[#18181b]/25 p-4 last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-white">
                  {getString(item.title) ||
                    getString(item.question) ||
                    getString(item.command)}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeConfig.summaryFields.map((fieldName) => {
                    const value = renderSummaryValue(item, fieldName);

                    if (!value) return null;

                    return (
                      <span
                        key={fieldName}
                        className="max-w-xs truncate rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-xs text-zinc-400"
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-indigo-500/50 hover:text-white"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => deleteResource(item)}
                  className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-rose-500/50 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {resources[activeResource].length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-600">
              No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

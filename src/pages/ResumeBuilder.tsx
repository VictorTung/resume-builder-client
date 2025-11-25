import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	type Education,
	type Experience,
	type PersonalInfo,
	type Project,
	type TResumeBuilder,
	type Template,
} from "../assets/assets";
import {
	ArrowLeftIcon,
	Briefcase,
	ChevronLeft,
	ChevronRight,
	DownloadIcon,
	EyeClosed,
	EyeIcon,
	FileText,
	FolderIcon,
	GraduationCap,
	Share2Icon,
	Sparkles,
	User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/home/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/home/ExperienceForm";
import EducationForm from "../components/home/EducationForm";
import ProjectForm from "../components/home/ProjectForm";
import SkillsForm from "../components/home/SkillsForm";
import { useSelector } from "react-redux";
import type { TRootState } from "../app/store";
import { AxiosError } from "axios";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
	const { resumeId } = useParams<{ resumeId: string }>();
	const { token } = useSelector((state: TRootState) => state.auth);

	const [resumeData, setResumeData] = useState<TResumeBuilder>({
		_id: "",
		title: "",
		personal_info: {
			full_name: "",
			email: "",
			phone: "",
			location: "",
			linkedin: "",
			website: "",
			profession: "",
			image: "",
		},
		professional_summary: "",
		experience: [],
		education: [],
		project: [],
		skills: [],
		template: "classic",
		accent_color: "#3B82F6",
		public: false,
	});
	const loadExistingResume = async () => {
		try {
			const { data } = await api.get(`/api/resumes/get/${resumeId}`, { headers: { Authorization: `Bearer ${token}` } });
			if (data.resume) {
				setResumeData(data.resume);
				document.title = data.resume.title;
			}
		} catch (error) {
			const errorMessage =
				error instanceof AxiosError && error.response?.data?.message
					? error.response.data.message
					: error instanceof Error
					? error.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	};

	const [activeSectionIndex, setActiveSectionIndex] = useState(0);
	const [removeBackground, setRemoveBackground] = useState(false);

	const sections = [
		{ id: "personal", name: "Personal Info", icon: User },
		{ id: "summary", name: "Summary", icon: FileText },
		{ id: "experience", name: "Experience", icon: Briefcase },
		{ id: "education", name: "Education", icon: GraduationCap },
		{ id: "projects", name: "Projects", icon: FolderIcon },
		{ id: "skills", name: "Skills", icon: Sparkles },
	];

	const activeSection = sections[activeSectionIndex];

	useEffect(() => {
		loadExistingResume();
	}, []);

	const changeResumeVisibility = async () => {
		try {
			const formData = new FormData();
			formData.append("resumeId", resumeId || "");
			formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

			const { data } = await api.put(`/api/resumes/update`, formData, { headers: { Authorization: `Bearer ${token}` } });
			if (data.message) {
				setResumeData((prev) => ({ ...prev, public: !prev.public }));
				toast.success(data.message);
			}
		} catch (error) {
			const errorMessage =
				error instanceof AxiosError && error.response?.data?.message
					? error.response.data.message
					: error instanceof Error
					? error.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	};

	const saveResume = async () => {
		try {
			const updateResumeData = structuredClone(resumeData);

			// remove image from updatedResumeData
			if (typeof resumeData.personal_info.image === "object") {
				delete updateResumeData.personal_info.image;
			}

			const formData = new FormData();
			formData.append("resumeId", resumeId || "");
			formData.append("resumeData", JSON.stringify(updateResumeData));
			if (removeBackground) formData.append("removeBackground", "yes");
			if (resumeData.personal_info.image && typeof resumeData.personal_info.image === "object")
				formData.append("image", resumeData.personal_info.image);

			const { data } = await api.put(`/api/resumes/update`, formData, { headers: { Authorization: `Bearer ${token}` } });
			if (data.message) {
				setResumeData(data.resume);
				toast.success(data.message);
			}
		} catch (error) {
			const errorMessage =
				error instanceof AxiosError && error.response?.data?.message
					? error.response.data.message
					: error instanceof Error
					? error.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	};

	const handleShare = async () => {
		const frontendUrl = window.location.href.split("/app/")[0];
		const resumeUrl = frontendUrl + "/view/" + resumeId;

		if (navigator.share) {
			navigator.share({
				text: "My Resume",
				url: resumeUrl,
			});
		} else {
			alert("Your browser does not support sharing. Please copy the link below to share your resume: " + resumeUrl);
			navigator.clipboard.writeText(resumeUrl);
			alert("Link copied to clipboard. You can now paste it to share your resume.");
		}
	};

	const downloadResume = () => {
		window.print();
	};

	return (
		<div>
			<div className="max-w-7xl max-auto py-6">
				<Link to={"/app"} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transistion-all">
					<ArrowLeftIcon className="size-4" /> Back to Dashboard
				</Link>

				<div className="max-w-7xl mx-auto px-4 pb-8">
					<div className="grid lg:grid-cols-12 gap-8">
						{/* left panel - Form*/}
						<div className="relative lg:col-span-5 rounded-lg overflow-hidden">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
								{/* progress bar using activeSectionIndex */}
								<hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
								<hr
									className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
									style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
								/>
								{/* Section navigation */}
								<div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
									<div className="flex items-center gap-2">
										<TemplateSelector
											selectedTemplate={resumeData.template}
											onChange={(template: Template) => {
												setResumeData((prev) => ({ ...prev, template }));
											}}
										/>
										<ColorPicker
											selectedColor={resumeData.accent_color}
											onChange={(color: string) => setResumeData((prev) => ({ ...prev, accent_color: color }))}
										/>
									</div>
									<div className="flex items-center">
										{activeSectionIndex !== 0 && (
											<button
												onClick={() => setActiveSectionIndex((pre) => Math.max(pre - 1, 0))}
												className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
												disabled={activeSectionIndex === 0}
											>
												<ChevronLeft className="size-4" /> Previous
											</button>
										)}
										<button
											onClick={() => setActiveSectionIndex((pre) => Math.min(pre + 1, sections.length - 1))}
											className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
												activeSectionIndex === sections.length - 1 && "opacity-50"
											}`}
											disabled={activeSectionIndex === sections.length - 1}
										>
											Next <ChevronRight className="size-4" />
										</button>
									</div>
								</div>

								{/* Form Content */}
								<div className="space-y-6">
									{activeSection.id === "personal" && (
										<PersonalInfoForm
											data={resumeData.personal_info}
											onChange={(data: PersonalInfo) => setResumeData((pre) => ({ ...pre, personal_info: data }))}
											removeBackground={removeBackground}
											setRemoveBackground={setRemoveBackground}
										/>
									)}
									{activeSection.id === "summary" && (
										<ProfessionalSummaryForm
											data={resumeData.professional_summary}
											onChange={(data: string) => setResumeData((pre) => ({ ...pre, professional_summary: data }))}
										/>
									)}
									{activeSection.id === "experience" && (
										<ExperienceForm
											data={resumeData.experience}
											onChange={(data: Experience[]) => setResumeData((pre) => ({ ...pre, experience: data }))}
										/>
									)}
									{activeSection.id === "education" && (
										<EducationForm
											data={resumeData.education}
											onChange={(data: Education[]) => setResumeData((pre) => ({ ...pre, education: data }))}
										/>
									)}
									{activeSection.id === "projects" && (
										<ProjectForm
											data={resumeData.project}
											onChange={(data: Project[]) => setResumeData((pre) => ({ ...pre, project: data }))}
										/>
									)}
									{activeSection.id === "skills" && (
										<SkillsForm
											data={resumeData.skills}
											onChange={(data: string[]) => setResumeData((pre) => ({ ...pre, skills: data }))}
										/>
									)}
								</div>
								<button
									onClick={() => toast.promise(saveResume, { loading: "Saving..." })}
									className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
								>
									Save Changes
								</button>
							</div>
						</div>
						{/* right panel - Preview*/}
						<div className="lg:col-span-7 max-lg:mt-6">
							<div className="relative w-full">
								<div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
									{resumeData.public && (
										<button
											onClick={handleShare}
											className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
										>
											<Share2Icon className="size-4" /> Share
										</button>
									)}
									<button
										onClick={changeResumeVisibility}
										className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors"
									>
										{resumeData.public ? <EyeIcon className="size-4" /> : <EyeClosed className="size-4" />}
										{resumeData.public ? "Public" : "Private"}
									</button>
									<button
										onClick={downloadResume}
										className="flex items-center px-6 py-2 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
									>
										<DownloadIcon className="size-4" />
										Download
									</button>
								</div>
							</div>

							{/* resume preview */}
							<ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResumeBuilder;

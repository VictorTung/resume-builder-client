import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Experience } from "../../assets/assets";
import type { TRootState } from "../../app/store";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }: { data: Experience[]; onChange: (data: Experience[]) => void }) => {
	const { token } = useSelector((state: TRootState) => state.auth);
	const [isGeneratingIndex, setIsGeneratingIndex] = useState<number>(-1);

	const addExperience = () => {
		const newExperience = {
			company: "",
			position: "",
			start_date: "",
			end_date: "",
			description: "",
			is_current: false,
			_id: "",
		};

		onChange([...data, newExperience]);
	};

	const removeExperience = (index: number) => {
		const updated = data.filter((_, i: number) => i !== index);
		onChange(updated);
	};

	const updateExperience = (index: number, field: string, value: string | boolean) => {
		const updated = [...data];
		updated[index] = { ...updated[index], [field]: value };
		onChange(updated);
	};

	const generateDescription = async (index: number) => {
		try {
			setIsGeneratingIndex(index);
			const prompt = `Enhance this job description (${data[index].description}) for the position of (${data[index].position}) at the company (${data[index].company})`;
			const response = await api.post(
				"/api/ai/enhance-job-description",
				{ userContent: prompt },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			updateExperience(index, "description", response.data.enhancedContent);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
			toast.error(errorMessage);
		} finally {
			setIsGeneratingIndex(-1);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Experience</h3>
					<p className="text-sm text-gray-500">Add your job experiences</p>
				</div>
				<button
					onClick={addExperience}
					className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
				>
					<Plus className="size-4" />
					Add Experience
				</button>
			</div>

			{data.length === 0 ? (
				<div className="text-center py-8 text-gray-500">
					<Briefcase className="w-12 h-12 mx-auto mb-3" />
					<p>No experience added yet.</p>
					<p className="text-sm">Click "Add Experience" to get started.</p>
				</div>
			) : (
				<div className="space-y-4">
					{data.map((experience, index) => (
						<div key={index} className="border p-4 rounded-lg border-gray-200 space-y-3">
							<div className="flex items-start justify-between">
								<h4>Experience #{index + 1}</h4>
								<button onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700 transition-colors">
									<Trash2 className="size-4" />
								</button>
							</div>
							<div className="grid md:grid-cols-2 gap-3">
								<input
									value={experience.company ?? ""}
									type="text"
									onChange={(e) => updateExperience(index, "company", e.target.value)}
									placeholder="Company Name"
									className="px-3 py-2 text-sm rounded-lg"
								/>

								<input
									value={experience.position ?? ""}
									type="text"
									onChange={(e) => updateExperience(index, "position", e.target.value)}
									placeholder="Job Title"
									className="px-3 py-2 text-sm rounded-lg"
								/>

								<input
									value={experience.start_date ?? ""}
									type="month"
									onChange={(e) => updateExperience(index, "start_date", e.target.value)}
									className="px-3 py-2 text-sm rounded-lg"
								/>

								<input
									value={experience.end_date ?? ""}
									type="month"
									onChange={(e) => updateExperience(index, "end_date", e.target.value)}
									className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
									disabled={experience.is_current}
								/>
							</div>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={experience.is_current || false}
									onChange={(e) => updateExperience(index, "is_current", e.target.checked ? true : false)}
									className="rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">Currently Working Here</span>
							</label>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium text-gray-700">Job Description</label>
									<button
										disabled={isGeneratingIndex === index || !experience.position || !experience.company}
										onClick={() => generateDescription(index)}
										className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
									>
										{isGeneratingIndex === index ? (
											<Loader2 className="w-3 h-3 animate-spin" />
										) : (
											<Sparkles className="w-3 h-3" />
										)}
										{isGeneratingIndex === index ? "Enhancing..." : "Enhance with AI"}
									</button>
								</div>
							</div>
							<textarea
								value={experience.description ?? ""}
								onChange={(e) => updateExperience(index, "description", e.target.value)}
								rows={4}
								className="w-full text-sm px-3 py-2 rounded-lg resize-none"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ExperienceForm;

import type { Education } from "../../assets/assets";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data, onChange }: { data: Education[]; onChange: (data: Education[]) => void }) => {
	const addEducation = () => {
		const newEducation = {
			institution: "",
			degree: "",
			field: "",
			graduation_date: "",
			gpa: "",
			_id: "",
		};
		onChange([...data, newEducation]);
	};

	const removeEducation = (index: number) => {
		const updated = data.filter((_, i: number) => i !== index);
		onChange(updated);
	};

	const updateEducation = (index: number, field: string, value: string) => {
		const updated = [...data];
		updated[index] = { ...updated[index], [field]: value };
		onChange(updated);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Education</h3>
					<p className="text-sm text-gray-500">Add your education details</p>
				</div>
				<button
					onClick={addEducation}
					className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
				>
					<Plus className="size-4" />
					Add Education
				</button>
			</div>

			{data.length === 0 ? (
				<div className="text-center py-8 text-gray-500">
					<GraduationCap className="w-12 h-12 mx-auto mb-3" />
					<p>No education added yet.</p>
					<p className="text-sm">Click "Add Education" to get started.</p>
				</div>
			) : (
				<div className="space-y-4">
					{data.map((education, index) => (
						<div key={index} className="border p-4 rounded-lg border-gray-200 space-y-3">
							<div className="flex items-start justify-between">
								<h4>Education #{index + 1}</h4>
								<button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 transition-colors">
									<Trash2 className="size-4" />
								</button>
							</div>
							<div className="grid md:grid-cols-2 gap-3">
								<input
									value={education.institution ?? ""}
									type="text"
									onChange={(e) => updateEducation(index, "institution", e.target.value)}
									placeholder="Institution Name"
									className="px-3 py-2 text-sm"
								/>

								<input
									value={education.degree ?? ""}
									type="text"
									onChange={(e) => updateEducation(index, "degree", e.target.value)}
									className="px-3 py-2 text-sm"
									placeholder="Degree (e.g., Bachelor's, Master's)"
								/>

								<input
									value={education.field ?? ""}
									type="text"
									onChange={(e) => updateEducation(index, "field", e.target.value)}
									placeholder="Field of Study"
									className="px-3 py-2 text-sm"
								/>

								<input
									value={education.graduation_date ?? ""}
									type="month"
									onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
									className="px-3 py-2 text-sm"
								/>
							</div>

							<input
								value={education.gpa ?? ""}
								type="text"
								onChange={(e) => updateEducation(index, "gpa", e.target.value)}
								className="px-3 py-2 text-sm"
								placeholder="GPA (optional)"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default EducationForm;

import type { Project } from "../../assets/assets";
import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data, onChange }: { data: Project[]; onChange: (data: Project[]) => void }) => {
	const addProject = () => {
		const newProject = {
			name: "",
			type: "",
			description: "",
			_id: "",
		};
		onChange([...data, newProject]);
	};

	const removeProject = (index: number) => {
		const updated = data.filter((_, i: number) => i !== index);
		onChange(updated);
	};

	const updateProject = (index: number, field: string, value: string) => {
		const updated = [...data];
		updated[index] = { ...updated[index], [field]: value };
		onChange(updated);
	};

	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Projects</h3>
					<p className="text-sm text-gray-500">Add your projects</p>
				</div>
				<button
					onClick={addProject}
					className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
				>
					<Plus className="size-4" />
					Add Project
				</button>
			</div>
			<div className="space-y-4 mt-6">
				{data.map((project, index) => (
					<div key={index} className="border p-4 rounded-lg border-gray-200 space-y-3">
						<div className="flex items-start justify-between">
							<h4>Project #{index + 1}</h4>
							<button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 transition-colors">
								<Trash2 className="size-4" />
							</button>
						</div>
						<div className="grid gap-3">
							<input
								value={project.name ?? ""}
								type="text"
								onChange={(e) => updateProject(index, "name", e.target.value)}
								placeholder="Project Name"
								className="px-3 py-2 text-sm rounded-lg"
							/>
							<input
								value={project.type ?? ""}
								type="text"
								onChange={(e) => updateProject(index, "type", e.target.value)}
								placeholder="Project Type"
								className="px-3 py-2 text-sm rounded-lg"
							/>
							<textarea
								rows={4}
								value={project.description ?? ""}
								onChange={(e) => updateProject(index, "description", e.target.value)}
								placeholder="Describe your project"
								className="w-full px-3 py-2 text-sm rounded-lg resize-none"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default ProjectForm;

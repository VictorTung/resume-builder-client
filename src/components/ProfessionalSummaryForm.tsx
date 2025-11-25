import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { TRootState } from "../app/store";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange }: { data: string; onChange: (summary: string) => void }) => {
	const { token } = useSelector((state: TRootState) => state.auth);
	const [isGenerating, setIsGenerating] = useState(false);

	const generateSummary = async () => {
		try {
			setIsGenerating(true);
			const prompt = `Enhance the my professional summary: ${data}`;
			const response = await api.post("/api/ai/enhance-pro-sum", { userContent: prompt }, { headers: { Authorization: `Bearer ${token}` } });
			onChange(response.data.enhancedContent);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
			toast.error(errorMessage);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
					<p className="text-sm text-gray-500">Add summary for your resume here</p>
				</div>
				<button
					disabled={isGenerating}
					onClick={generateSummary}
					className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
				>
					{isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
					{isGenerating ? "Enhancing..." : "AI Enhance"}
				</button>
			</div>
			<div className="mt-6">
				<textarea
					className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-1g focus:ring focus: ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-gray-900"
					rows={7}
					value={data || ""}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Write a compelling professional summary that highlights your key strengths and career objectives ..."
				></textarea>
				<p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
					Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
				</p>
			</div>
		</div>
	);
};

export default ProfessionalSummaryForm;

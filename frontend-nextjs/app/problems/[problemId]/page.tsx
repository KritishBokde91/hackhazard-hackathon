import CodingChallengePage from "@/components/question";

export default async function ProblemPage({ params }: { params: Promise<{ problemId: number }> }) {
  const { problemId } = await params
  return (
    <CodingChallengePage problemId={Number(problemId)} />
  );
}

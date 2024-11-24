export default function getQuestion(
  question: string,
  answers: string[],
  rightAnswer: number,
) {
  return {
    title: question,
    index: 0,
    answers: answers.map((title: string, index: number) => ({
      title,
      score: rightAnswer === index ? 1 : 0,
    })),
  };
}

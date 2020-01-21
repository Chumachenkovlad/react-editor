import { Word } from "../Editor/models";

export async function getSynonyms(word: string): Promise<string[]> {
  const res = await fetch(`https://api.datamuse.com/words?ml=${word}&max=10`);
  const body = await res.json();

  if (Array.isArray(body)) {
    return body.map((word: Word) => word.word);
  }

  throw new Error(body.message);
}

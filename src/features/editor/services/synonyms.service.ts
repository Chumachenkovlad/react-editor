import { Word } from "../models";

export class SynonymsService {
  public static async getSynonyms(
    word: string
  ): Promise<Word[] | { message: string }> {
    const res = await fetch(`https://api.datamuse.com/words?ml=${word}&max=10`);
    const body = await res.json();

    if (Array.isArray(body)) {
      return body as Word[];
    }

    throw new Error(body.message);
  }
}

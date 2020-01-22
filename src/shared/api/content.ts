import { createStorage } from 'shared/api/storage';
import { DEFAULT_CONTENT } from 'shared/constants/default-content';

const storage = createStorage('editor-content', DEFAULT_CONTENT);

export function updateContent(html: string) {
    storage.setItem(html);
}

export function getContent(): string {
    return storage.getItem()
}

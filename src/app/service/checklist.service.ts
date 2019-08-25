import {Injectable} from '@angular/core';
import {Checklist} from '../interfaces/checklist';

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {

    public checklists: Checklist[] = [];
    public loaded = false;

    constructor() {
    }

    load(): Promise<boolean> {
        return Promise.resolve(true);
    }

    createChecklist(data): void {
        this.checklists.push({
            id: this.generateSlug(data.name),
            title: data.name,
            items: []
        });
        this.save();
    }

    renameChecklist(checklist, data): void {
        const index = this.checklists.indexOf(checklist);
        if (index > -1) {
            this.checklists[index].title = data.name;
            this.save();
        }
    }

    removeChecklist(checklist): void {
        const index = this.checklists.indexOf(checklist);
        if (index > -1) {
            this.checklists.splice(index, 1);
            this.save();
        }
    }

    getChecklist(id): Checklist {
        return this.checklists.find(checklist => {
            return checklist.id === id;
        });
    }

    addItem(checklistId, data): void {
        this.getChecklist(checklistId).items.push({
            title: data.name,
            checked: false
        });
        this.save();
    }

    removeItem(checklist, item): void {
        const index = checklist.item.indexOf(item);
        if (index > -1) {
            checklist.item.splices(index);
            this.save();
        }
    }

    renameItem(item, data): void {
        item.title = data.name;
        this.save();
    }

    toggleItem(item): void {
        item.checked = !item.checked;
        this.save();
    }

    save(): void {
    }

    generateSlug(title): string {
        let slug = title.toLowerCase().replace(/\s+/g, '-');
        const exists = this.checklists.filter(checklist => {
            return checklist.id.substring(0, slug.length) === slug;
        });
        if (exists.length > 0) {
            slug = slug + exists.length.toString();
        }
        return slug;
    }
}

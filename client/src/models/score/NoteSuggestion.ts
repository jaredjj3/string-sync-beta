class NoteSuggestion {
  description: string;
  notes: Array<string>;

  constructor(description: string, notes: Array<string>) {
    this.description = description;
    this.notes = notes;
  }
}

export default NoteSuggestion;


// UML Link : https://app.diagrams.net/?libs=general;uml#
// 1. base
// ==========================================
class User {
    protected id: number;
    public name: string;
    protected email: string;
    private password: string;
    public phone: string;
    protected age: number;

    // 5. Aggregation: المستخدم يقدر يمتلك أكتر من NoteBook
    public notebooks: NoteBook[] = [];

    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        
        if (age >= 18 && age <= 60) {
            this.age = age;
        } else {
            throw new Error("Age must be between 18 and 60");
        }
    }

    public displayInfo(): void {
        console.log(`User Info - ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Age: ${this.age}, Phone: ${this.phone}`);
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
        console.log(`Notebook "${notebook.title}" added to user ${this.name}.`);
    }
}

// 2. Inheritance from user
// ==========================================
class Admin extends User {
    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        super(id, name, email, password, phone, age);
    }

    public manageNotes(): void {
        console.log(`Admin ${this.name} is managing the notes system.`);
    }
}


// 3. Note Class & 6. Association with User
// ==========================================
class Note {
    public id: number;
    public title: string;
    public content: string;
    public userId: number;  
    public author: User;

    constructor(id: number, title: string, content: string, author: User) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author['id']; 
    }

    public preview(): string {
        return this.content.length > 20 ? this.content.substring(0, 20) + "..." : this.content;
    }
}


// 4. NoteBook Class
// ==========================================
class NoteBook {
    public title: string;
    private notes: Note[] = [];

    constructor(title: string) {
        this.title = title;
    }

    public addNote(note: Note): void {
        this.notes.push(note);
        console.log(`Note "${note.title}" added successfully.`);
    }

    public removeNote(noteId: number): void {
        const index = this.notes.findIndex(note => note.id === noteId);
        if (index !== -1) {
            console.log(`Note "${this.notes[index]!.title}" removed.`);
            this.notes.splice(index, 1);
        } else {
            console.log("Note not found!");
        }
    }

    public listNotes(): void {
        console.log(` * NoteBook: ${this.title} Contents :`);
        this.notes.forEach(note => {
            console.log(`ID: ${note.id} | Title: ${note.title} | Author: ${note.author.name} | Preview: ${note.preview()}`);
        });
    }
}


// 7. Generics 
// ==========================================
class DataStorage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
        console.log("Item added to storage successfully.");
    }

    public removeItem(item: T): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log("Item removed from storage.");
        } else {
            console.log("Item not found in storage!");
        }
    }

    public getAllItems(): T[] {
        return this.items;
    }
}



// testing
// ==========================================
console.log("* 1. Testing Users & Admin :");
const user1 = new User(1, "Kholoud", "kholoud@test.com", "123456", "01012345678", 22);
user1.displayInfo();

const admin1 = new Admin(2, "omair Admin", "admin@test.com", "admin123", "01198765432", 30);
admin1.displayInfo();
admin1.manageNotes();

console.log("\n* 2. Testing Aggregation & Association :");
const myBook = new NoteBook("Kholoud's Notes");
user1.addNotebook(myBook);

const note1 = new Note(1, "TypeScript OOP", "TypeScript is a strongly typed programming language that builds on JavaScript.", user1);
const note2 = new Note(2, "Shopping List", "Buy milk, eggs, bread, and fruits from the supermarket.", user1);

myBook.addNote(note1);
myBook.addNote(note2);

myBook.listNotes();

myBook.removeNote(1);
myBook.listNotes();

console.log("\n* 3. Testing Generics DataStorage :");
const stringStorage = new DataStorage<string>();
stringStorage.addItem("First Data in Storage");
stringStorage.addItem("Second Data in Storage");
console.log("All stored items:", stringStorage.getAllItems());

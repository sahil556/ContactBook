import { action, autorun, computed, makeObservable, observable, set, toJS, } from "mobx";
import {faker} from "@faker-js/faker";
import toast from "react-hot-toast";
const generatePlaceholderData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        let name = faker.name.findName();
        data.push({
            name,
            number: faker.phone.phoneNumber("02# ### ####"),
            photo: `https://ui-avatars.com/api/?name=${name}&length=1&background=random&size=262`,
            id: `${i}`,
        });
    }
    return data;
};



const saveStore = (_this) => {
    const storedJson = localStorage.getItem("phonebookStore");
    if (storedJson) {
        set(_this, JSON.parse(storedJson));
    }
    autorun(() => {
        const value = toJS(_this);
        localStorage.setItem("phonebookStore", JSON.stringify(value));
    });
};
class Store {
    constructor() {
        this.filterString = "";
        this.addContact = ({ name, number }) => {
            this.contacts.push({
                name,
                number,
                photo: `https://ui-avatars.com/api/?name=${name}&length=1&background=random&size=262`,
                id: `${this.contacts.length + 1}`,
            });
            toast.success("Contact added");
        };
        this.removeContact = (id) => {
            this.contacts = this.contacts.filter((e) => e.id !== id);
            toast.success("Contact deleted");
        };
        this.findContact = (id) => {
            return this.contacts.find((e) => e.id === id);
        };
        this.updateContact = (id, payload) => {
            // Find index
            let index = this.contacts.findIndex((e) => e.id === id);
            this.contacts[index] = payload;
            toast.success("Contact updated");
        };
        this.updateFilter = (filter) => {
            this.filterString = filter;
        };
        makeObservable(this, {
            contacts: observable,
            filterString: observable,
            addContact: action,
            removeContact: action,
            updateContact: action,
            updateFilter: action,
            contactCount: computed,
            filteredContacts: computed,
        });
        this.contacts = generatePlaceholderData(23);
        saveStore(this);
    }
    get contactCount() {
        return this.contacts.length;
    }
    get filteredContacts() {
        // FIlter
        let filtered = this.contacts.filter((contact) => contact.name.match(new RegExp(this.filterString, "i")));
        // Sort
        filtered = filtered.sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1));
        return filtered;
    }
}
export default new Store();
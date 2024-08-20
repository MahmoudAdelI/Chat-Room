class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {
        // Calculate time since data.time usin fns libirary
        const when = dateFns.distanceInWordsToNow(
            data.time.toDate(), { addSuffix: true }
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.user}:</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `
        this.list.innerHTML += html;
    };
}
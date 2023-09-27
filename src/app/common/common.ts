export async function getUser() {
    if (document.cookie) {
        console.log(document.cookie);
        const cookie = document.cookie.split(';').find(cookie => cookie.includes('user='));
        if (!cookie) {
            console.log("No cookie found");
            return null;
        }
        const uuid = cookie.split('=')[1].trim();
        console.log("Cookie found: " + uuid);
        const res = await fetch(`${API_URL}/user/get?uuid=${uuid}`);
        const user = await res.json();
        return user;
    }
    console.log("No cookie found");
    return null;
}

export const API_URL = "https://football-shop-api.site.quack-lab.dev/api";
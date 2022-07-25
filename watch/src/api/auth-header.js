export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        // For Spring Boot back-end
        // return { Authorization: "Bearer " + user.accessToken };
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}

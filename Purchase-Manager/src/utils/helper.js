export function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const uniqueId = parseInt(`${timestamp}${random}`);
    return uniqueId;
}

export const getCurrentDateISOString = () => {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
};
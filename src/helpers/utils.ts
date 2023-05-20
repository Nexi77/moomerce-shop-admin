export function generateUniqueId(): string {
    const timestamp: number = Date.now();
    const random: number = Math.random() * 10**16;
    const uniqueId = `${timestamp}-${random}`;
  
    return uniqueId;
}
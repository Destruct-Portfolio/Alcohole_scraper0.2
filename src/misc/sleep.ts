import { execSync } from "node:child_process"

export default class Sleep {
    public static async For(seconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }
}
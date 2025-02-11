import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Inserts a new win/loss record into Supabase.
 * @param {number} win - Must be either `1` (win) or `0` (loss)
 * @returns {Promise<boolean>} - Returns `true` if successful, `false` otherwise.
 */
export async function insertWinLoss(win: number): Promise<boolean> {
    if (win !== 0 && win !== 1) {
        console.error("Invalid input: win must be either 1 (win) or 0 (loss)");
        return false;
    }

    // Get the current timestamp in ISO format
    const timestamp = new Date().toISOString(); // Formats as TIMESTAMPZ

    try {
        const { error } = await supabase
            .from("win_loss_table") // Update this if your table name is different
            .insert([{ date: timestamp, win }]);

        if (error) {
            console.error("Error inserting data:", error);
            return false;
        }

        console.log(`nserted win=${win} at ${timestamp}`);
        return true;
    } catch (err) {
        console.error("Unexpected error:", err);
        return false;
    }
}
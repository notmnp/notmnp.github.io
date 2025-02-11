import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertWinLoss(win: number): Promise<boolean> {

    const timestamp = new Date().toISOString(); // Formats as TIMESTAMPZ

    try {
        const { error } = await supabase
            .from("win_loss_table") 
            .insert([{ date: timestamp, win }]);

        if (error) {
            console.error("Error inserting data:", error);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error:", err);
        return false;
    }
}
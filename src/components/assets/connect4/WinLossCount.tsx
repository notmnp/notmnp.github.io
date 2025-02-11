import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  export async function getWinLossCount(): Promise<{ wins: number; losses: number }> {
    try {
      const { data, error } = await supabase.from("win_loss_table").select();
  
      if (error) throw error;

      console.log("Fetched Data:", data);
      console.log("Total Rows Read:", data.length);
  
      // Count wins (win = true or win = 1) and losses (win = false or win = 0)
      const wins = data.filter((row) => row.win === true || row.win === 1).length;
      const losses = data.filter((row) => row.win === false || row.win === 0).length;
  
      return { wins, losses };
    } catch (err) {
      console.error("Error fetching table data:", err);
      return { wins: 0, losses: 0 }; 
    }
  }
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  export async function getWinLossCount(): Promise<{ wins: number; losses: number; draws: number }> {
    try {
      const { data, error } = await supabase.from("win_loss_table").select();
  
      if (error) throw error;
  
      // Count wins (win = true or win = 1) and losses (win = false or win = 0)
      const wins = data.filter((row) => row.win === 1).length;
      const losses = data.filter((row) => row.win === 0).length;
      const draws = data.filter((row) => row.win === 2).length;
  
      return { wins, losses, draws };
    } catch (err) {
      console.error("Error fetching table data:", err);
      return { wins: 0, losses: 0, draws: 0 }; 
    }
  }
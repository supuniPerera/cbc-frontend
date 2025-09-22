import { createClient } from "@supabase/supabase-js"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94emtsbHhxem5iamFza215bGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjc5MDcsImV4cCI6MjA3MjkwMzkwN30.3jmPoM6_qvc6bs1M1vD8dDK4V6upcxhq3H6WPKUGQGQ";
const supabaseUrl = "https://oxzkllxqznbjaskmyljs.supabase.co";

const supabase = createClient(supabaseUrl,anonKey);


export default function mediaUpload(file){
    return new Promise((resolve, reject) => {
		if (file == null) {
			reject("No file selected");
		} else {
            const timestamp = new Date().getTime();
            const fileName = timestamp+file.name

			supabase.storage
				.from("images")
				.upload(fileName, file, {
					upsert: false,
					cacheControl: "3600",
				})
				.then(() => {
					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;

					resolve(publicUrl);
				}).catch(
                    ()=>{
                        reject("An error occured")
                    }
                )
		}
	});
}


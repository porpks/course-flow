import { Router } from "express";
import supabase from "../utils/db.js";
const profileRouter = Router();

// profileRouter.get("/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   return res.json({
//     message: `user ${userId}`,
//   });
// });

profileRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  return res.json({
    message: `user ${userId}`,
  });
});

profileRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId; // Get the userId from the URL parameters

  try {
    const { data, error, status } = await supabase
      .from("register")
      .select(`full_name, image_url`)
      .eq("user_id", userId);

    if (error) {
      return res.status(status).json({ error: error.message });
    }
    console.log(data);
    if (data) {
      return res.json({
        // message: `User found with username: ${data.username}`,
        full_name: data[0].full_name,
        image_url: data[0].image_url,
      });
    } else {
      return res.status(404).json({
        message: `User not found with id: ${userId}`,
      });
    }
  } catch (err) {
    // Handle any unexpected errors here
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default profileRouter;

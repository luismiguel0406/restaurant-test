import { postOrderService } from "../../services/orders/order.service.js";

export const postOrder = async (req, res) => {
  try {
    const { body } = req;
    await postOrderService(body);
    res.json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "internal error", error });
  }
};

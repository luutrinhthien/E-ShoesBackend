import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    TenSp: String,
    LoaiSp: String,
    HangSanXuat: String,
    SoLuong: Number,
    SoSpDaBan: {
      type: Number,
      default: 0,
    },
    Mota: String,
    HinhAnh: Array,
    TinhTrang: String,
    Gia: Number,
    DiaChi: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;

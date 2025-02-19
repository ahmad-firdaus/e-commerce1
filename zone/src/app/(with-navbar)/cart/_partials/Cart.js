"use client";
import Config from "@/core/config";
import { formatCurrency } from "@/core/helpers";
import { useAuth } from "@/core/useAuth";
import { Fragment, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaCheck, FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);

  useEffect(() => {
    const fectCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(Config.baseApiUrl() + "cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          setCartData(data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fectCart();
  }, []);

  const user = useAuth();
  if (!user) return;

  const deleteCart = async (cartId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(Config.baseApiUrl() + "cart/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartId: cartId,
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        toast.success(result.message);
        setCartData(cartData.filter((item) => item.cart_id !== cartId));
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const toggleCart = (cartId, productId, quantity, variant, price) => {
    if (selectedCart.some((cart) => cart.cartId === cartId)) {
      setSelectedCart((prevCart) =>
        prevCart.filter((cart) => cart.cartId !== cartId)
      );
      return;
    }
    setSelectedCart((prevCart) => [
      ...prevCart,
      {
        cartId,
        productId,
        quantity,
        variant,
        price,
      },
    ]);
  };
return (
    <Fragment>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header Cart */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-300">
          <h1 className="text-4xl font-extrabold text-gray-900">
            🛒 Your Cart
          </h1>
          <p className="text-gray-600 text-lg">{cartData.length} items</p>
        </div>

        {/* List Item di Keranjang */}
        <div className="flex flex-col gap-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-300 mt-6">
          {cartData.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">
              Your cart is empty 😔
            </p>
          ) : (
            cartData.map((item) => (
              <div
                key={item.cart_id}
                className="flex items-center gap-6 w-full p-5 rounded-2xl shadow-lg bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-105"
              >
                {/* Checkbox */}
                <div
                  onClick={() =>
                    toggleCart(
                      item.cart_id,
                      item.id,
                      item.quantity,
                      item.variant,
                      item.price
                    )
                  }
                  className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm cursor-pointer transition-all ${
                    selectedCart.some((cart) => cart.cartId === item.cart_id)
                      ? "bg-green-500 border-green-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <FaCheck className="text-xl" />
                </div>

                {/* Product Image & Details */}
                <Link
                  href={`/product/${item.slug}`}
                  className="flex items-center gap-6 w-full"
                >
                  <Image
                    src={Config.baseUrl() + item.img_urls[0]}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-cover rounded-xl shadow-md transition-transform hover:scale-110 hover:shadow-xl"
                  />
                  <div>
{/* Product Name */}
                    <h3 className="font-bold text-xl text-gray-900">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaStar className="text-yellow-500" />
                        <span>{item.rating}</span>
                      </div>
                    )}

                    {/* Variant */}
                    {item.variant && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>Variant:</span>
                        <span className="font-medium">{item.variant}</span>
                      </div>
                    )}

                    {/* Price */}
                    <p className="text-gray-700 text-sm">
                      {formatCurrency(item.price)}
                    </p>

                    {/* Quantity & Subtotal */}
                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-gray-900">
                        Subtotal: {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteCart(item.cart_id)}
                  className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                >
                  <GoTrash className="text-2xl text-white" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
{/* Sticky Checkout Bar */}
      <div className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-300 p-6 flex items-center justify-between transition-all duration-500">
        <div>
          <p className="text-gray-600 text-lg">Total:</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(
              selectedCart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
            )}
          </p>
        </div>
        <button
          type="button"
          className="bg-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Check Out
        </button>
      </div>
    </Fragment>
  );
}

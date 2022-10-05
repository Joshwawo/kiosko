const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("en-MX", {
    style: "currency",
    currency: "MXN",
  });
};

export { formatearDinero };

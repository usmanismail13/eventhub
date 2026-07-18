function PaymentButton() {
  function handlePayment() {
    const transactionHash = "0xDEMO123456789";

    alert(
      `Transaction sent!\nTransaction Hash: ${transactionHash}`
    );
  }

  return (
    <button onClick={handlePayment}>
      Pay for Ticket
    </button>
  );
}

export default PaymentButton;
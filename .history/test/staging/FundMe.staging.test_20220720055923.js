uint256 percentage = 30;
function splitAmountToOwnerAndSeller(uint256 amount)
    internal
    view
    returns (uint256 amountForSender, uint256 amountForOwner)
{
    amountForSender = (amount * (100 - percentage)) / 100;
    amountForOwner = (amount * percentage) / 100;
}


uint256 percentage = 30;
    function splitAmountToOwnerAndSeller(uint256 amount) internal view returns (uint256 amountForSender, uint256 amountForOwner)
    {
        uint256 ownerPercentage = percentage;
        amountForSender = (amount * (100 - ownerPercentage)) / 100;
        amountForOwner = (amount * ownerPercentage) / 100;
    }
const PopupScreen = ({ marketData }: { marketData: any[] }) => {
  const renderItems = () => {
    return marketData.map((item, index) => {
      const { token1Balance, token2Balance } = item;
      const total = token1Balance + token2Balance;
      return (
        <div key={index} className="rounded-lg border-4 border-gray-600 bg-gray-700 p-6">
          <p className="mb-4">{item.description}</p>
          <div className="mx-auto mb-4 flex w-4/5 justify-center space-x-4">
            <button className="w-1/2 rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600">Vote Yes</button>
            <button className="w-1/2 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600">Vote No</button>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            {/* <span>Total Votes: 1,234</span> */}
            <span>{item.outcome1}: {Math.round(total ? (token2Balance / total) * 100 : 50).toFixed(2)}%</span>
            <span>{item.outcome2}: {Math.round(total ? (token1Balance / total) * 100 : 50).toFixed(2)}%</span>
            <span>Pool: ${Math.round(total).toFixed(2)}</span>
          </div>
        </div>
      )
    })
  }
  
  return (
    <div>
      <main>
        <section id="twitter-feed" className="bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Latest Predictions</h2>
            <div id="predictions-container" className="mx-auto max-w-3xl space-y-6">
              {marketData && renderItems()}
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="mb-6 w-full md:mb-0 md:w-1/3">
              <h3 className="mb-4 text-xl font-bold">About PredictX</h3>
              <p className="text-gray-400">PredictX lets you create prediction market from an X post enabling real-time, cost-effective betting on outcomes, sharing opinions, and leveraging the power of crowd-sourced forecasting. Join our community of predictors today!</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PredictX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PopupScreen;
{authState.user?.address && (
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Your Saved Address</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {typeof authState.user.address === 'string'
                      ? authState.user.address
                      : JSON.stringify(authState.user.address)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeliveryAddress(
                      typeof authState.user?.address === 'string'
                        ? authState.user.address
                        : JSON.stringify(authState.user?.address) || ""
                    )}
                  >
                    Use This Address
                  </Button>
                </div>
              )}
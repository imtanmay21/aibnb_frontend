<div className="w-[100%] h-[100px] bg-white rounded-full shadow-xl flex flex-row items-center space-x-2 px-5 justify-center">

<div className="h-[100%] relative">
    <PanelButton
        onClick={() =>
            setShowDestinations(
                !showDestinations
            )
        }
        panelLabel="Destination"
        panelValue="New York, NY"
    />


    {showDestinations && (
        <div className="absolute bg-white w-[300px] p-5 rounded-xl shadow-lg flex flex-col top-[110%]">
            {destinations.map((destination) => (
                <button className="cursor-pointer text-left py-5">
                    {destination.name}
                </button>
            ))}
        </div>
    )}
</div>

<div className="h-[100%] flex flex-2">
    <PanelButton
        panelLabel="Check in Date"
        isDate={true}
    />
</div>

<div className="h-[100%] flex flex-2">
    <PanelButton
        panelLabel="Check out Date"
        isDate={true}
    />
</div>

<div className="flex flex-[0.1] h-[100%]">
    <PanelButton
        panelLabel="Guests"
        panelValue="2"
    />
</div>


<div className="flex flex-[0.2] h-[100%] flex-row items-center px-5">
    <button
        onMouseOver={() =>
            setShowBuildLabel(true)
        }
        onMouseLeave={() =>
            setShowBuildLabel(false)
        }
        className="bg-blue-600 h-10 px-3 rounded-full cursor-pointer flex flex-row items-center justify-center"
    >
        <span
            className={`text-white ${
                showBuildLabel
                    ? classes.showBuildLabel
                    : classes.buildLabel
            }`}
        >
            Build!
        </span>
        <ArrowRightIcon
            color="#fff"
            height={20}
        />
    </button>
</div>
</div>
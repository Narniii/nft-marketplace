export const countCreatorFee = (royalties, creator) => {
    if (royalties && royalties.length !== 0) {
        for (var i = 0; i < royalties.length; i++)
            if (royalties[i].wallet_address == creator)
                return <span>{royalties[i].royalty}%</span>
            else return <span>0%</span>
    }
    else return <span>0%</span>
}



export const countAuctionTime = (auction) => {
    var this_time = parseFloat(new Date(Date.now()).getTime()) / 1000
    let aucDur = parseFloat(auction.duration)
    let aucStart = parseFloat(auction.start_time)
    let end_time_date = (aucStart + aucDur) * 1000
    let end_time = aucStart + aucDur
    let difference = end_time - this_time
    let days = Math.floor(difference / 86400);
    let hours = Math.floor(difference / 3600) % 24;
    let minutes = Math.floor(difference / 60) % 60;
    let seconds = Math.floor(difference % 60);

    let date = new Date(end_time_date);
    let year = date.getFullYear()
    let day = date.getDate()
    let month = date.toLocaleString('default', { month: 'short' });

    if (days > 30) {
        return <>{month + day + '-' + year}</>
    } else if (days > 0) {
        return <>{days} days</>
    } else if (hours > 0) {
        return <>{hours} hours</>
    }
    else if (minutes > 0) { return <>{minutes} mins</> }
    else if (seconds > 0) { return <>{seconds} secs</> }
    else return <>auction is ended</>

}



export const countTimeAgo = (date) => {
    let this_time = new Date().getTime()
    let last_time = new Date(date).getTime()
    let difference = Math.abs(this_time - last_time) / 1000
    let days = Math.floor(difference / 86400);
    let hours = Math.floor(difference / 3600) % 24;
    let minutes = Math.floor(difference / 60) % 60;
    let seconds = Math.floor(difference % 60);
    if (days > 0) {
        if (days == 1)
            return <span>{days + ' day' + ' ago'}</span>
        else
            return <span>{days + ' days' + ' ago'}</span>
    } else if (hours > 0) {
        return <span>{hours + ' hrs' + ' ago'}</span>
    }
    return <span>{minutes + ' mins' + ' ago'}</span>

}


export const countExpireTime = (date) => {
    let this_time = new Date().getTime()
    let expire_time = new Date(date).getTime()
    let difference = (expire_time - this_time) / 1000
    let days = Math.floor(difference / 86400);
    let hours = Math.floor(difference / 3600) % 24;
    let minutes = Math.floor(difference / 60) % 60;
    let seconds = Math.floor(difference % 60);
    console.log(days, hours, minutes)
    if (days > 0) {
        return <span>{days + ' days'}</span>
    } else if (hours > 0) {
        return <span>{hours + ' hrs'}</span>
    } else if (minutes > 0) {
        return <span>{minutes + ' mins'}</span>
    }
    else return <span>expired</span>

}


export const convertDate = (TSdate) => {
    const date = new Date(TSdate);
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' });
    return <span>{month + day}</span>

}


export const convertThisDate = (ddate) => {
    let this_time = new Date()
    const day = this_time.getDate()
    const year = this_time.getFullYear()
    const month = this_time.toLocaleString('default', { month: 'short' });
    return <span>{month + day + ',' + year}</span>
}

export const convertThisHour = (time) => {
    let this_time = new Date()
    const hour = this_time.getHours()
    const minute = this_time.getMinutes()
    return <span>{hour + ':' + minute}</span>

}


export const shorten = (str) => {
    if (str)
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    return 'undefined'
}
export const shortenMedium = (str) => {
    if (str)
        return str.length > 15 ? str.substring(0, 15) + "..." : str;
    return 'undefined'
}

export const shortenLong = (str) => {
    if (str)
        return str.length > 100 ? str.substring(0, 70) + "..." : str;
    return 'undefined'
}

export function percentage(partialValue, totalValue) {
    let perc = (100 * partialValue) / totalValue;
    return Math.round(perc)
}

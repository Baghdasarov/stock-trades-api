const Trade = require('../models/trades');

exports.createTrade = async (req, res) => {
    try {
        const { type, user_id, symbol, shares, price, timestamp } = req.body;

        const lastTrade = await Trade.findOne({}, {}, { sort: { 'createdAt': -1 } });
        const nextTradeId = lastTrade ? lastTrade.id + 1 : 1;

        const trade = new Trade({
            id: nextTradeId,
            type,
            user_id,
            symbol,
            shares,
            price,
            timestamp
        });

        await trade.save();

        const trimmedTrade = {
            id: trade.id,
            type: trade.type,
            user_id: trade.user_id,
            symbol: trade.symbol,
            shares: trade.shares,
            price: trade.price,
            timestamp: trade.timestamp
        };

        res.status(201).json(trimmedTrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getTrades = async (req, res) => {
    try {
        let filter = {};

        if (req.query.type) {
            filter.type = req.query.type;
        }

        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }

        const trades = await Trade.find(filter, { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 });

        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findOne({ id: req.params.id }, { __v: 0, _id: 0, createdAt: 0, updatedAt: 0 });

        if (!trade) {
            return res.status(404).send('ID not found');
        }

        res.status(200).json(trade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.methodNotAllowed = (req, res) => {
    res.status(405).send('Method Not Allowed');
};

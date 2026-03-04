import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Journal from './models/Journal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        const user = await User.findById(decoded.id);

        if (!user) throw new Error();

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Vui lòng xác thực tài khoản' });
    }
};

// Phục vụ file tĩnh từ frontend (folder dist)
const frontendPath = path.join(__dirname, '../react-web-app/dist');
app.use(express.static(frontendPath));

// Kết nối MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_journal';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Đã kết nối MongoDB');
        // Tạo user mặc định nếu chưa có
        seedDefaultUser();
    })
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

async function seedDefaultUser() {
    try {
        // Xóa admin cũ để đảm bảo reset hoàn toàn dữ liệu lỗi thời
        await User.deleteOne({ username: 'admin' });

        const admin = new User({
            username: 'admin',
            password: 'password123',
            nickname: 'Cố vấn AI'
        });
        await admin.save();
        console.log('👤 Đã reset tài khoản mặc định: admin / password123');
    } catch (error) {
        console.error('Lỗi khi seed user:', error);
    }
}

// Routes - Auth
app.get('/api/auth/me', auth, async (req, res) => {
    res.json({
        user: {
            username: req.user.username,
            nickname: req.user.nickname
        }
    });
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, nickname, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        const newUser = new User({ username, nickname, password });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('❌ Lỗi Đăng ký:', error);
        res.status(500).json({ message: 'Lỗi server khi đăng ký', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`🔑 Thử đăng nhập: ${username}`);

        const user = await User.findOne({ username });
        if (!user) {
            console.log(`❌ Không tìm thấy user: ${username}`);
            return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`❌ Mật khẩu không khớp cho user: ${username}`);
            return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });

        console.log(`✅ Đăng nhập thành công: ${username}`);
        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                username: user.username,
                nickname: user.nickname
            }
        });
    } catch (error) {
        console.error('❌ Lỗi Đăng nhập:', error);
        res.status(500).json({ message: 'Lỗi server khi đăng nhập', error: error.message });
    }
});

// Routes - Journal
app.post('/api/journals', auth, async (req, res) => {
    try {
        const { content, mood, tags } = req.body;
        const journal = new Journal({
            user: req.user._id,
            content,
            mood,
            tags
        });
        await journal.save();
        res.status(201).json(journal);
    } catch (error) {
        console.error('❌ Lỗi lưu Nhật ký:', error);
        res.status(500).json({ message: 'Lỗi server khi lưu nhật ký', error: error.message });
    }
});

app.get('/api/journals', auth, async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(journals);
    } catch (error) {
        console.error('❌ Lỗi lấy Nhật ký:', error);
        res.status(500).json({ message: 'Lỗi server khi lấy nhật ký', error: error.message });
    }
});

// Route catch-all cho React Router
app.use((req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại port ${PORT}`);
    console.log(`🌐 Truy cập: http://localhost:${PORT}`);
});

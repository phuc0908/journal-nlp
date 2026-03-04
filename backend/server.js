import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const defaultUser = new User({
                username: 'admin',
                password: 'password123',
                nickname: 'Cố vấn AI'
            });
            await defaultUser.save();
            console.log('👤 Đã tạo tài khoản mặc định: admin / password123');
        }
    } catch (error) {
        console.error('Lỗi khi seed user:', error);
    }
}

// Routes
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
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                username: user.username,
                nickname: user.nickname
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
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

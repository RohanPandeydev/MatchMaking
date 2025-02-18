import { useState, useEffect, useCallback, useRef } from 'react';
import config from '../../config';
import WebSocketcustomContext from '../contexts/WebSocketContext';
import customContext from '../contexts/Context';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import StorageData from './storagehelper/StorageData';

const useWebSocket = () => {
    const [messages, setMessages] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigation

    const token = StorageData.getToken() || false
    const { socketContext, setSocketContext, socketUserListing, setSocketUserListing } = WebSocketcustomContext();

    const connectWebSocket = useCallback(() => {
        // If socket already exists, don't create a new one
        if (socketRef.current) return;

        const ws = new WebSocket(config.websocket);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
            setError(null);
            setRetryCount(0);
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages(() => data);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('WebSocket connection error');
            setIsConnected(false);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
            setIsConnected(false);
            setError('WebSocket connection closed');
            setSocket(null);
            socketRef.current = null;

            // Attempt to reconnect
            if (token) {
                if (retryCount < 3) {
                    setTimeout(() => {
                        setRetryCount((prev) => prev + 1);
                        connectWebSocket();
                    }, 5000);
                } else {
                    // Swal.fire('Unable to connect to the server. Please try again later.');
                    navigate(-1 || '/'); // Redirect to the last URL or fallback to root
                }
            }
        };

        return ws;
    }, [token, retryCount]);

    const disconnectWebSocket = useCallback(() => {
        if (socketRef.current) {
            console.log('Closing WebSocket connection');
            socketRef.current.close();
            socketRef.current = null;
        }
        setIsConnected(false);
        setError('WebSocket connection manually closed');
        setSocket(null);
        setRetryCount(0); // Reset retry count
    }, []);

    useEffect(() => {
        if (token && config.websocket) {
            connectWebSocket();
        }

        return () => {
            disconnectWebSocket(); // Ensure the WebSocket is cleaned up on unmount
        };
    }, []); // Dependencies ensure proper handling

    const sendMessage = useCallback((message) => {
        if (socket && isConnected) {
            try {
                socket.send(JSON.stringify(message));
                return true;
            } catch (error) {
                console.error('Error sending message:', error);
                return false;
            }
        }
        return false;
    }, [socket, isConnected]);

    const markMessageAsRead = useCallback((data) => {
        if (socket && isConnected) {
            const readEvent = {
                event_type: 'read_message',
                ...data,
            };
            try {
                socket.send(JSON.stringify(readEvent));
                console.log(`Read message event sent for message ID: ${data?.id}`);
                return true;
            } catch (error) {
                console.error('Error sending read message event:', error);
                return false;
            }
        }
        return false;
    }, [socket, isConnected]);

    useEffect(() => {
        setSocketContext({
            messages,
            sendMessage,
            isConnected,
            error,
            retryCount,
            markMessageAsRead,
            disconnectWebSocket, // Include the disconnect function in the context
        });
    }, [messages, sendMessage, isConnected, error, retryCount, disconnectWebSocket]);

    return {
        messages,
        sendMessage,
        isConnected,
        error,
        retryCount,
        markMessageAsRead,
        disconnectWebSocket, // Return the disconnect function
    };
};

export default useWebSocket;

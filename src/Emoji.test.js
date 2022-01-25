import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import React from 'react'
import App from './App';

describe('all test', () => {
    let emoji100, input;

    beforeEach(() => {
        render(<App />);
        emoji100 = screen.getByText(/100/i)
        input = screen.getByPlaceholderText(/search emoji/i)
    })

    it("should got header", () => {
        const headerTitle = screen.getByText(/Emoji Search/i)
        expect(headerTitle).toBeInTheDocument();
    })

    it("should render emoji list", () => {
        expect(emoji100).toBeInTheDocument()
    })

    it("should filter", () => {
        const emojiText = "grim"
        userEvent.type(input, emojiText)
        expect(emoji100).not.toBeInTheDocument()
    })

    it("should copy", () => {
        document.execCommand = jest.fn();
        userEvent.click(emoji100)

        expect(document.execCommand).toBeCalledWith('copy')

        const copyEmoji = window.ClipboardData;
        expect(copyEmoji).toEqual(emoji100.value)
    })
});
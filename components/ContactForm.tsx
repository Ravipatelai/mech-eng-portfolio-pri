

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),

  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),

  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success/Error message
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Remove previous message
    setStatusMessage('');
    setStatusType('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS
        setStatusType('success');
        setStatusMessage('Your message was successfully sent.');

        // Clear form
        form.reset();
      } else {
        // ERROR
        setStatusType('error');
        setStatusMessage(
          data.error || 'Your message could not be sent.'
        );
      }
    } catch (error) {
      // SERVER / NETWORK ERROR
      console.error(error);

      setStatusType('error');
      setStatusMessage(
        'Your message could not be sent. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center">
        Contact Me
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Your Name"
                    {...field}
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-primary"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-primary"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    className="border rounded-lg p-2 focus:ring-2 focus:ring-primary"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUCCESS / ERROR MESSAGE */}
          {statusMessage && (
            <div
              className={`rounded-lg p-3 text-center text-sm font-medium ${
                statusType === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Ask me anything</p>
        <h2 className={styles.sectionHeadText}>Chat with my AI.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] flex flex-col md:flex-row gap-10'
      >
        <div className='flex-1'>
          <p>
            Feel free to ask me about my experience, projects, or anything else you'd like to know. 
            My AI assistant is here to help you learn more about my work and expertise.
          </p>
          <div className='mt-4 text-[15px] text-gray-400'>
            <p>Powered by Mistral AI</p>
            <p>Response times may vary based on server load</p>
          </div>
        </div>
        
        <div className='flex-1 min-h-[500px] relative'>
          <ChatBox className="relative h-full w-full" />
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Chat, 'chat');
